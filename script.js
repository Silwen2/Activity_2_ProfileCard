document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selection ---
    const profileForm = document.getElementById('profile-form');
    const nameInput = document.getElementById('name-input');
    const jobTitleInput = document.getElementById('job-title-input');
    const bioInput = document.getElementById('bio-input');
    const colorInput = document.getElementById('color-input');
    const imageInput = document.getElementById('image-input'); // NEW

    // Real-Time Preview Elements
    const previewName = document.getElementById('preview-name');
    const previewJob = document.getElementById('preview-job');

    const profileCard = document.getElementById('profile-card');
    const cardName = document.getElementById('card-name');
    const cardJob = document.getElementById('card-job');
    const cardBio = document.getElementById('card-bio');
    const likeBtn = document.getElementById('like-btn');
    const likeCountSpan = document.getElementById('like-count');
    const cardImage = document.getElementById('card-image');

    let likeCount = 0;


    nameInput.addEventListener('input', () => {
        previewName.textContent = nameInput.value;
    });

    jobTitleInput.addEventListener('input', () => {
        previewJob.textContent = jobTitleInput.value;
    });

    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();

        cardName.textContent = nameInput.value || 'Your Name';
        cardJob.textContent = jobTitleInput.value || 'Your Job Title';
        cardBio.textContent = bioInput.value || 'Your Bio';

        const color = colorInput.value;
        if (isValidColor(color)) {
            profileCard.style.borderColor = color;
            likeBtn.style.backgroundColor = color;
            likeBtn.style.color = getContrastColor(color);
        } else {
            profileCard.style.borderColor = '#ccc';
            likeBtn.style.backgroundColor = '#f0f0f0';
            likeBtn.style.color = '#333';
        }

        const file = imageInput.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                cardImage.src = e.target.result;
                cardImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            cardImage.style.display = 'none';
            cardImage.src = '';
        }
    });

    likeBtn.addEventListener('click', () => {
        likeCount++;
        likeCountSpan.textContent = likeCount;
    });


    function isValidColor(strColor) {
        const s = new Option().style;
        s.color = strColor;
        return s.color !== '';
    }

    function getContrastColor(hexColor) {
        hexColor = hexColor.replace('#', '');
        const r = parseInt(hexColor.substring(0, 2), 16);
        const g = parseInt(hexColor.substring(2, 4), 16);
        const b = parseInt(hexColor.substring(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
        return luminance > 128 ? '#000000' : '#FFFFFF';
    }
});
