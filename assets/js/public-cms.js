import { collection, doc, onSnapshot, query, where } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
import { db } from './firebase-config.js';

const text = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value) element.textContent = value;
};

onSnapshot(doc(db, 'site', 'settings'), (snapshot) => {
  if (!snapshot.exists()) return;
  const data = snapshot.data();
  text('#cmsHeroTitle', data.heroTitle);
  text('#cmsHeroLead', data.heroLead);
  text('#cmsContactHeading', data.contactHeading);
  text('#cmsContactLead', data.contactLead);
  text('#cmsPhone', data.phone);
  text('#cmsEmail', data.email);
  text('#cmsLocation', data.location);
  const phoneLink = document.querySelector('#cmsPhoneLink');
  const emailLink = document.querySelector('#cmsEmailLink');
  if (phoneLink && data.phone) phoneLink.href = `tel:${data.phone.replace(/\s/g, '')}`;
  if (emailLink && data.email) emailLink.href = `mailto:${data.email}`;
}, () => {});

const gallery = document.querySelector('#galleryGrid');
const lightbox = document.querySelector('#lightbox');

function bindGallery() {
  const items = [...document.querySelectorAll('.g-item')];
  document.querySelectorAll('.filter-btn').forEach((button) => {
    button.onclick = () => {
      document.querySelectorAll('.filter-btn').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const selected = button.dataset.filter;
      items.forEach((item) => {
        const categories = item.dataset.category.split(',');
        item.classList.toggle('hidden', selected !== 'all' && !categories.includes(selected));
      });
    };
  });
  items.forEach((item) => {
    item.onclick = () => {
      const image = item.querySelector('img');
      document.querySelector('#lightboxImg').src = image.src;
      text('#lightboxTitle', item.querySelector('h4').textContent);
      text('#lightboxDesc', item.querySelector('.g-body span').textContent);
      lightbox.classList.add('open');
    };
  });
}

onSnapshot(query(collection(db, 'projects'), where('published', '==', true)), (snapshot) => {
  if (snapshot.empty || !gallery) return;
  gallery.innerHTML = snapshot.docs
    .map((project) => ({ id: project.id, ...project.data() }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((project) => `
      <article class="g-item${project.tall ? ' tall' : ''}" data-category="${project.category || 'branding'}" tabindex="0" role="button" aria-label="View ${escapeHtml(project.title)}">
        <div class="g-thumb">
          <span class="g-cat-dot" style="background:${project.accent || '#c98a2e'}"></span>
          <img src="${escapeAttr(project.image)}" alt="${escapeAttr(project.title)}" loading="lazy">
        </div>
        <div class="g-body"><h4>${escapeHtml(project.title)}</h4><span>${escapeHtml(project.description || '')}</span></div>
      </article>`).join('');
  bindGallery();
}, () => {});

const videoGrid = document.querySelector('#videoGrid');
onSnapshot(query(collection(db, 'videos'), where('published', '==', true)), (snapshot) => {
  if (snapshot.empty || !videoGrid) return;
  const videos = snapshot.docs.map((video) => ({ id: video.id, ...video.data() }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  videoGrid.innerHTML = videos.map((video) => {
    const media = video.mode === 'embed'
      ? `<div class="video-media"><iframe src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=false&width=700" title="${escapeAttr(video.title)}" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe></div>`
      : `<a class="video-media" href="${escapeAttr(video.url)}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${escapeAttr(video.title)} on Facebook">${video.thumbnail ? `<img src="${escapeAttr(video.thumbnail)}" alt="${escapeAttr(video.title)}" loading="lazy">` : '<span class="video-fallback">▶</span>'}</a>`;
    return `<article class="video-card reveal in-view">${media}<h3>${escapeHtml(video.title)}</h3><span class="role">${escapeHtml(video.description || 'Facebook video')}</span><a class="video-watch" href="${escapeAttr(video.url)}" target="_blank" rel="noopener noreferrer">Watch on Facebook ↗</a></article>`;
  }).join('');
}, () => {});

function escapeHtml(value = '') {
  return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}
function escapeAttr(value = '') { return escapeHtml(value); }
