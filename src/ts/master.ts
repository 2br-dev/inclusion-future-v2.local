import Swiper from "swiper";
import { Pagination, Navigation } from "swiper/modules";
import Lazy from "vanilla-lazyload";
import * as M from "materialize-css";

(() => {
	M.AutoInit();

	Swiper.use([Pagination, Navigation]);

	let lazy = new Lazy({}, document.querySelectorAll(".lazy"));
	const sidenav = M.Sidenav.init(document.querySelectorAll(".sidenav"), {
		edge: "right",
	});

	function updateNavbar() {
		const scrollTop = document.documentElement.scrollTop;
		const navbar = document.querySelector("header#fixed");
		if (scrollTop > 200) {
			navbar.classList.add("visible");
		} else {
			navbar.classList.remove("visible");
		}
		requestAnimationFrame(updateNavbar);
	}

	updateNavbar();

	if (document.querySelectorAll("#news-slider").length) {
		const newsSwiper = new Swiper("#news-slider", {
			spaceBetween: 20,
			pagination: {
				type: "bullets",
				el: "#main-news-pagination",
				clickable: true,
			},
			navigation: {
				prevEl: ".prev",
				nextEl: ".next",
			},
			breakpoints: {
				400: {
					slidesPerView: 1,
				},
				900: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
				1600: {
					slidesPerView: 4,
				},
			},
			on: {
				slideChange: () => {
					lazy.update();
				},
			},
		});
	}

	if (document.querySelectorAll("#main-partners").length) {
		const newsSwiper = new Swiper("#main-partners", {
			spaceBetween: 20,
			pagination: {
				type: "bullets",
				el: "#main-partners-pagination",
				clickable: true,
			},
			breakpoints: {
				400: {
					slidesPerView: 1,
				},
				900: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
				1600: {
					slidesPerView: 4,
				},
				1800: {
					slidesPerView: 5,
				},
			},
		});
	}
})();
