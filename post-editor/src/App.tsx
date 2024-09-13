import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { locales } from "@blocknote/core";
import { useCallback, useEffect, useState } from "react";
import {
	Button,
	CircularProgress,
	Fade,
	LinearProgress,
	Snackbar,
} from "@mui/material";
import TextareaAutosize from "react-textarea-autosize";
import "./styles.scss";
import React from "react";

function App() {
	interface IDoc {
		id: number;
		pagetitle: string;
		introtext: string;
		cover: string;
		content: object;
		imagelist: Array<string>;
		selected: boolean;
		loading: boolean;
	}

	const defaultDocument = {
		id: 0,
		pagetitle: "Заголовок статьи",
		introtext: "Текст вступления",
		cover: "",
		content: "",
		selected: false,
		loading: false,
		imagelist: new Array<string>(),
	};

	const [document, setDocument] = useState(defaultDocument);
	const apiBase = "http://inclusion.local/";
	const apiURL = `${apiBase}api/`;
	const [docs, setDocs] = useState(Array<IDoc>);
	const [listLoading, setListLoading] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const getList = useCallback(
		(preselect: boolean = false) => {
			setListLoading(true);
			const selectedDoc = localStorage.getItem("selectedDoc");
			fetch(`${apiURL}list.php?parent=2`)
				.then((res) => res.json())
				.then((response) => {
					response.list.forEach((item: IDoc) => {
						if (
							preselect &&
							selectedDoc &&
							item.id === parseInt(selectedDoc)
						) {
							item.selected = true;
							item.loading = true;
						} else {
							item.loading = false;
							item.selected = false;
						}
					});
					setDocs(response.list);
					setListLoading(false);
				})
				.catch((err) => console.error(err));
		},
		[apiURL]
	);

	useEffect(() => {
		getList(true);
	}, [getList]);

	const uploadFile = async (file: File) => {
		const body = new FormData();
		body.append("file", file);

		const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
			method: "POST",
			body: body,
		});

		const url: string = (await ret.json()).data.url.replace(
			"tmpfiles.org/",
			"tmpfiles.org/dl/"
		);

		document.imagelist.push(url);

		return url;
	};

	const editor = useCreateBlockNote({
		dictionary: locales.ru,
		uploadFile: uploadFile,
	});

	const handlePagetitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const _doc = { ...document };
		_doc.pagetitle = e.target.value;
		setDocument(_doc);
	};

	const handleIntroChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const _doc = { ...document };
		_doc.introtext = e.target.value;
		setDocument(_doc);
	};

	const savePost = async () => {
		await editor.blocksToHTMLLossy(editor.document).then((content) => {
			const url = `${apiURL}save.php`;
			const doc = { ...document };
			doc.content = content;
			const data = JSON.stringify(doc);

			fetch(url, {
				method: "POST",
				body: data,
			})
				.then((res) => res.json())
				.then((response) => {
					setSnackbarMessage(response.message);
					setSnackbarOpen(true);

					setTimeout(() => {
						setSnackbarOpen(false);
					}, 2000);

					if (!doc.id) {
						getList();
					}
				});
		});
	};

	const deletePost = () => {
		const docId = document.id;
		const _docs = [...docs].filter((d) => d.id !== docId);
		fetch(`${apiURL}delete.php?id=${docId}`)
			.then((res) => res.json())
			.then((response) => {
				setDocs(_docs);
				setSnackbarMessage(response.message);
				setSnackbarOpen(true);
				setTimeout(() => {
					setSnackbarOpen(false);
				}, 2000);
			})
			.catch((err) => console.error(err));
	};

	const ImagePlaceholder = () => {
		return (
			<div
				style={{
					display: "flex",
					height: "100%",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<div className="meta-editor">
					<div className="image-placeholder">
						<div className="intro">
							Перетащите сюда картинку, или нажмите
						</div>
						<div className="button-wrapper">
							<Button size="small">Загрузить</Button>
						</div>
					</div>
					<input
						onChange={handlePagetitleChange}
						value={document.pagetitle}
						className="pagetitle-editor"
					/>
					<TextareaAutosize
						value={document.introtext}
						onChange={handleIntroChange}
						className="intro-editor"
					/>
				</div>
				<div
					className="actions-control"
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<Button
						color="error"
						variant="contained"
						disableElevation
						size="small"
						onClick={deletePost}
					>
						Удалить
					</Button>
					<Button
						variant="contained"
						disableElevation
						size="small"
						onClick={savePost}
					>
						Сохранить
					</Button>
				</div>
			</div>
		);
	};

	const setDoc = (e: React.MouseEvent<HTMLElement>) => {
		if (!e.currentTarget) return;
		const id = parseInt(e.currentTarget.dataset.id || "");
		loadDoc(id);
	};

	const loadDoc = async (id: number) => {
		const _docs = [...docs];
		const doc = _docs.find((doc) => doc.id === id);

		if (doc) {
			if (!doc.selected) {
				localStorage.setItem("selectedDoc", doc.id.toString());
				_docs.forEach((d) => {
					d.loading = false;
					d.selected = false;
				});
				if (doc) {
					doc.selected = true;
					doc.loading = true;
					setDocs(_docs);
				}
				await fetch(`${apiURL}read.php?id=${id}`)
					.then((res) => res.json())
					.then((response) => {
						setDocument(response.data);
						editor
							.tryParseHTMLToBlocks(response.data.content)
							.then((value) => {
								editor.replaceBlocks(editor.document, value);
							});
						docs.forEach((d) => (d.loading = false));
						setDocs([...docs]);
					});
			} else {
				doc.selected = false;
				localStorage.removeItem("selectedDoc");
				setDocs([...docs]);
				setDocument(defaultDocument);
				editor.replaceBlocks(editor.document, []);
			}
		}
	};

	const DocList = () => {
		return (
			<>
				<div className="block-header">Другие документы</div>
				<div className="list-wrapper">
					{docs.map((doc, dindex) => (
						<div
							className={
								doc.selected ? "doc-item selected" : "doc-item"
							}
							onClick={setDoc}
							data-id={doc.id}
							key={dindex}
						>
							<div
								className="avatar"
								style={{
									backgroundImage:
										"url(" +
										apiBase +
										"/" +
										doc.cover +
										")",
								}}
							>
								<Fade in={doc.loading} unmountOnExit>
									<CircularProgress />
								</Fade>
							</div>
							<div className="pagetitle">{doc.pagetitle}</div>
						</div>
					))}
				</div>
			</>
		);
	};

	return (
		<section>
			<div className="container">
				<div className="main-editor-layout">
					<aside className="meta-wrapper">{ImagePlaceholder()}</aside>
					<main className="main-wrapper">
						<BlockNoteView editor={editor} theme="light" />
					</main>
					<aside className="docs-wrapper">
						<Fade in={listLoading}>
							<LinearProgress sx={{ marginBottom: "20px" }} />
						</Fade>
						<DocList />
					</aside>
				</div>
			</div>
			<Snackbar
				open={snackbarOpen}
				message={snackbarMessage}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			/>
		</section>
	);
}

export default App;
