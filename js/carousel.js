let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');

        function showSlide(index) {
            const totalSlides = slides.length;
            currentSlide = (index + totalSlides) % totalSlides;
            document.querySelector('.slides').style.transform = `translateX(${-currentSlide * 100}%)`;
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Mudar automaticamente o slide a cada 5 segundos
        setInterval(nextSlide, 15000);