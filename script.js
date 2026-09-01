document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Link Aktif Sesuai Posisi Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.navbar nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 2. Tombol Back To Top (Tampil Saat Scroll Bawah)
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 3. Scroll Reveal Effect (Efek Muncul Saat Di-scroll)
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger sekali saat halaman load pertama kali
});

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animasi Elemen Timeline
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 120;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});

document.addEventListener('DOMContentLoaded', () => {

    // TAB SWITCHER UNTUK HALAMAN PLATFORM
    const tabBtns = document.querySelectorAll('.tab-btn');
    const platformPanels = document.querySelectorAll('.platform-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus class active dari semua tombol
            tabBtns.forEach(b => b.classList.remove('active'));
            // Hapus class active dari semua panel
            platformPanels.forEach(p => p.classList.remove('active'));

            // Tambahkan class active ke tombol yang diklik
            btn.classList.add('active');

            // Ambil ID target dari atribut data-tab dan aktifkan panelnya
            const targetId = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

});

// DATABASE GAME UNTUK POPUP GENRE (Sesuai Screenshot Referensi)
const genreData = {
    action: [
        "Grand Theft Auto V",
        "Devil May Cry 5",
        "DOOM Eternal"
    ],
    adventure: [
        "Uncharted 4",
        "Tomb Raider",
        "It Takes Two"
    ],
    rpg: [
        "The Witcher 3",
        "Elden Ring",
        "Persona 5"
    ],
    strategy: [
        "Civilization VI",
        "StarCraft II",
        "Age of Empires IV"
    ],
    simulation: [
        "The Sims 4",
        "Cities: Skylines",
        "Stardew Valley"
    ],
    sports: [
        "EA FC 25",
        "NBA 2K25",
        "Rocket League"
    ],
    horror: [
        "Resident Evil 4",
        "Outlast",
        "Dead Space"
    ],
    puzzle: [
        "Portal 2",
        "Tetris Effect",
        "Monument Valley"
    ]
};

document.addEventListener('DOMContentLoaded', () => {

    const filterBtns = document.querySelectorAll('.filter-btn');
    const genreCards = document.querySelectorAll('.genre-card');
    const detailBanner = document.getElementById('genreDetailBanner');
    const detailGenreName = document.getElementById('detailGenreName');
    const detailList = document.getElementById('detailList');
    const closeDetailBtn = document.getElementById('closeDetailBtn');

    // Fungsi untuk Menampilkan Banner Contoh Game
    function showGenreDetail(genreKey) {
        if (!genreData[genreKey]) return;

        detailGenreName.textContent = genreKey.toUpperCase();
        detailList.innerHTML = '';

        genreData[genreKey].forEach(gameTitle => {
            const item = document.createElement('div');
            item.className = 'game-item-box';
            item.innerHTML = `<span class="icon">🎮</span> <span>${gameTitle}</span>`;
            detailList.appendChild(item);
        });

        detailBanner.classList.add('show');
    }

    // Event Listener Klik pada Kartu Genre
    genreCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            
            // Highlight kartu terpilih
            genreCards.forEach(c => c.classList.remove('active-card'));
            card.classList.add('active-card');

            // Set filter button aktif
            filterBtns.forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-genre') === category);
            });

            // Tampilkan kartu yang difilter saja
            genreCards.forEach(c => {
                c.style.display = (c.getAttribute('data-category') === category) ? 'flex' : 'none';
            });

            showGenreDetail(category);
        });
    });

    // Event Listener Tombol Filter
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedGenre = btn.getAttribute('data-genre');

            // Aktifkan tombol filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (selectedGenre === 'all') {
                // Tampilkan semua kartu & sembunyikan banner detail
                genreCards.forEach(c => {
                    c.style.display = 'flex';
                    c.classList.remove('active-card');
                });
                detailBanner.classList.remove('show');
            } else {
                // Sembunyikan kartu lain dan tampilkan genre terpilih
                genreCards.forEach(c => {
                    if (c.getAttribute('data-category') === selectedGenre) {
                        c.style.display = 'flex';
                        c.classList.add('active-card');
                    } else {
                        c.style.display = 'none';
                        c.classList.remove('active-card');
                    }
                });
                showGenreDetail(selectedGenre);
            }
        });
    });

    // Tombol Tutup Banner Detail
    closeDetailBtn.addEventListener('click', () => {
        detailBanner.classList.remove('show');
    });

});

document.addEventListener('DOMContentLoaded', () => {

    // 1. SLIDER BERITA (Next / Prev Arrows)
    const newsSliderWrapper = document.querySelector('.news-slider-wrapper');
    const prevNewsBtn = document.getElementById('prevNewsBtn');
    const nextNewsBtn = document.getElementById('nextNewsBtn');

    if (newsSliderWrapper && prevNewsBtn && nextNewsBtn) {
        const scrollAmount = 360; // Ukuran geser per klik

        nextNewsBtn.addEventListener('click', () => {
            newsSliderWrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevNewsBtn.addEventListener('click', () => {
            newsSliderWrapper.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // 2. BACK TO TOP BUTTON
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});