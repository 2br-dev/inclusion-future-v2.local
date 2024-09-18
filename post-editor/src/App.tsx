import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { locales } from "@blocknote/core";
import { useCallback, useEffect, useState } from "react";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Fade,
	LinearProgress,
	Snackbar,
} from "@mui/material";
import TextareaAutosize from "react-textarea-autosize";
import "./styles.scss";
import React from "react";

function App() {
	interface IDoc {
		id: number | null;
		pagetitle: string;
		introtext: string;
		cover: string;
		content: string | null;
		selected: boolean;
		loading: boolean;
		hasChanges: boolean;
	}

	const defaultDocument: IDoc = {
		id: null,
		pagetitle: "Заголовок статьи",
		introtext: "Текст вступления",
		cover: "",
		content: "",
		selected: false,
		loading: false,
		hasChanges: false,
	};

	const [document, setDocument] = useState({ ...defaultDocument });

	const apiBase = "http://inclusion.local/";
	const apiURL = `${apiBase}api/`;
	const [docs, setDocs] = useState(Array<IDoc>);
	const [listLoading, setListLoading] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [dialogOpen, setDialogOpen] = useState(false);

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

		return url;
	};

	const editor = useCreateBlockNote({
		dictionary: locales.ru,
		uploadFile: uploadFile,
	});

	const handleChangeContent = () => {
		const _docs = [...docs];
		const _doc = _docs.find((doc) => doc.id === document.id);
		if (_doc) {
			_doc.hasChanges = true;
			setDocs(_docs);
		}
	};

	const getList = useCallback(
		(preselect: boolean = false) => {
			setListLoading(true);
			const selectedDoc = localStorage.getItem("selectedDoc");
			fetch(`${apiURL}list.php`)
				.then((res) => res.json())
				.then((listResponse) => {
					if (!listResponse.list.length) {
						setListLoading(false);
						return;
					}
					listResponse.list.forEach((item: IDoc) => {
						if (
							preselect &&
							selectedDoc &&
							item.id === parseInt(selectedDoc)
						) {
							item.selected = true;
							item.loading = true;
							item.hasChanges = false;
							fetch(`${apiURL}read.php?id=${item.id}`)
								.then((res) => res.json())
								.then((response) => {
									const responseDoc = response.data;
									const content = responseDoc.content;
									editor
										.tryParseHTMLToBlocks(content)
										.then((value) => {
											editor.replaceBlocks(
												editor.document,
												value
											);
											setDocument({
												id: responseDoc.id,
												pagetitle:
													responseDoc.pagetitle,
												introtext:
													responseDoc.introtext,
												cover: responseDoc.cover,
												content: responseDoc.content,
												selected: true,
												loading: false,
												hasChanges: false,
											});
											const listItems = [
												...listResponse.list,
											];
											const item = listItems.find(
												(d) => d.id === responseDoc.id
											);
											if (item) {
												item.loading = false;
												setDocs(listItems);
											}
										});
								})
								.catch((error) => {
									item.loading = false;
									console.error(error);
								});
						} else {
							item.loading = false;
							item.selected = false;
							item.hasChanges = false;
						}
					});

					setDocs(listResponse.list);
					setListLoading(false);
				})
				.catch((err) => console.error(err));
		},
		[apiURL, editor]
	);

	useEffect(() => {
		getList(true);
	}, [getList]);

	const handlePagetitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const _selectedDoc = { ...document };
		_selectedDoc.pagetitle = e.target.value;
		setDocument(_selectedDoc);

		const _docs = [...docs];
		const _doc = _docs.find((d) => d.id === document.id);
		if (_doc) {
			_doc.pagetitle = e.target.value;
			_doc.hasChanges = true;
		}
		setDocs(_docs);
	};

	const handleIntroChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const _selectedDoc = { ...document };
		_selectedDoc.introtext = e.target.value;
		_selectedDoc.hasChanges = true;
		setDocument(_selectedDoc);

		const _docs = [...docs];
		const _doc = _docs.find((d) => d.id === document.id);
		if (_doc) {
			_doc.introtext = e.target.value;
			_doc.hasChanges = true;
		}
		setDocs(_docs);
	};

	const savePost = async () => {
		await editor.blocksToFullHTML(editor.document).then((content) => {
			const url = `${apiURL}save.php`;
			const doc = { ...document };
			doc.content = content;
			const data = JSON.stringify(doc);

			const _docs = [...docs];
			const _doc = _docs.find((d) => d.id === doc.id);
			if (_doc) {
				doc.loading = true;
			}

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
					} else {
						const _docs = [...docs];
						const _doc = _docs.find((d) => d.id === doc.id);
						if (_doc) {
							_doc.hasChanges = false;
							_doc.loading = false;
						}
						setDocs(_docs);
					}
				});
		});
	};

	const confirmDelete = () => {
		if (document) {
			if (document.id) {
				setDialogOpen(true);
			} else {
				setDocs([...docs].filter((d) => d.id !== null));
				const doc = { ...document };
				doc.selected = false;
				setDocument(doc);
			}
		}
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
				setDialogOpen(false);
				setTimeout(() => {
					setSnackbarOpen(false);
				}, 2000);
			})
			.catch((err) => console.error(err));
	};

	const ImagePlaceholder = () => {
		if (docs.length) {
			const selected = docs.filter((d) => d.selected);
			if (!selected.length) return <></>;
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
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Button
							color="error"
							disableElevation
							size="small"
							onClick={confirmDelete}
						>
							Удалить
						</Button>
						<Button
							disableElevation
							size="small"
							onClick={savePost}
						>
							Сохранить
						</Button>
					</div>
				</div>
			);
		}
	};

	const setDoc = async (e: React.MouseEvent<HTMLElement>) => {
		if (!e.currentTarget) return;
		const id = parseInt(e.currentTarget.dataset.id || "");

		if (document.id === null) {
			editor.blocksToFullHTML(editor.document).then((value) => {
				document.content = value;
			});
		}

		const filterId = isNaN(id) ? null : id;
		const _docs = [...docs];
		const doc = _docs.find((doc) => doc.id === filterId);

		if (doc) {
			if (!doc.selected) {
				localStorage.setItem("selectedDoc", (doc.id || "").toString());

				_docs.forEach((d) => {
					d.loading = false;
					d.selected = false;
				});

				if (doc.id === id) {
					doc.selected = true;
					doc.loading = true;
				}

				setDocs(_docs);
				setDocument(doc);

				if (doc.id !== null) {
					await fetch(`${apiURL}read.php?id=${id}`)
						.then((res) => res.json())
						.then((response) => {
							const doc = response.data;
							setDocument({
								id: parseInt(doc.id),
								pagetitle: doc.pagetitle,
								introtext: doc.introtext,
								content: doc.content,
								loading: false,
								selected: false,
								hasChanges: false,
								cover: "",
							});
							docs.forEach((d) => (d.loading = false));
							setDocs([...docs]);
							editor
								.tryParseHTMLToBlocks(response.data.content)
								.then((value) => {
									editor.replaceBlocks(
										editor.document,
										value
									);
								});
						});
				} else {
					editor
						.tryParseHTMLToBlocks(doc.content || "")
						.then((value) => {
							editor.replaceBlocks(editor.document, value);
						});
					doc.loading = false;
				}
			} else {
				doc.selected = false;
				localStorage.removeItem("selectedDoc");
				setDocs([...docs]);
				editor.removeBlocks(editor.document);
			}
		}
	};

	const makeDocument = () => {
		const _docs = [...docs];
		docs.forEach((d) => (d.selected = false));
		const doc = {
			id: null,
			pagetitle: defaultDocument.pagetitle,
			introtext: defaultDocument.introtext,
			content: "",
			cover: "",
			loading: false,
			selected: true,
			hasChanges: false,
		};
		_docs.push(doc);
		editor.tryParseHTMLToBlocks("").then((value) => {
			editor.replaceBlocks(editor.document, value);
		});
		setDocument(doc);
		setDocs(_docs);
	};

	const DocList = () => {
		const changedDoc = docs.find((d) => d.hasChanges);

		const className = (doc: IDoc) => {
			let c = "doc-item";
			c += doc.selected ? " selected" : "";
			c += doc.loading ? " loading" : "";
			c += doc.hasChanges ? " has-changes" : "";
			c +=
				document.id === null &&
				document.selected &&
				document.id !== doc.id
					? " disabled"
					: "";
			if (changedDoc) {
				c += doc.id !== changedDoc.id ? " disabled" : "";
			}
			return c;
		};

		return (
			<>
				<div className="block-header">Другие документы</div>
				<div className="list-wrapper">
					{docs.map((doc, dindex) => (
						<div
							className={className(doc)}
							onClick={setDoc}
							data-id={doc.id}
							key={dindex}
						>
							<div
								className={"avatar"}
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
					<div style={{ padding: "20px" }}>
						{!docs.filter((d) => d.id === null).length ? (
							<Button onClick={makeDocument}>
								Новый документ
							</Button>
						) : (
							<></>
						)}
					</div>
				</div>
			</>
		);
	};

	const editorControl = () => {
		if (docs.length) {
			if (docs.filter((d) => d.selected).length) {
				return (
					<BlockNoteView
						editor={editor}
						theme="light"
						onKeyUp={handleChangeContent}
					/>
				);
			} else {
				return (
					<div className="editor-placeholder">
						<h2>Создайте новый документ</h2>
						<p>
							В настоящий момент нет выбранного документа для
							редактирования. Пожалуйста, выберите документ из
							списка справа, или создайте новый.
						</p>
						<Button onClick={makeDocument} variant="contained">
							Новый документ
						</Button>
					</div>
				);
			}
		}
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
	};

	return (
		<section>
			<div className="container">
				<div className="main-editor-layout">
					<aside className="meta-wrapper">{ImagePlaceholder()}</aside>
					<main className="main-wrapper">{editorControl()}</main>
					<aside className="docs-wrapper">
						<Fade in={listLoading}>
							<LinearProgress sx={{ marginBottom: "20px" }} />
						</Fade>
						{DocList()}
					</aside>
				</div>
			</div>
			<Dialog
				open={dialogOpen}
				onClose={handleCloseDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Удаление документа
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Вы действительно хотите удалить этот документ?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Отмена</Button>
					<Button onClick={deletePost} autoFocus color="error">
						Удалить
					</Button>
				</DialogActions>
			</Dialog>
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
