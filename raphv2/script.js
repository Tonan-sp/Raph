
const photos=[...document.querySelectorAll('.gallery img')];
const galleryButtons=[...document.querySelectorAll('.gallery button')];
const lightbox=document.getElementById('lightbox'), large=document.getElementById('lightboxImage');
const gallery=document.getElementById('photoGallery');
const galleryScroll=document.getElementById('galleryScroll');
let currentPhoto=0;
let galleryExpanded=false;
galleryScroll.hidden=galleryButtons.length<=3;
galleryScroll.addEventListener('click',()=>{
  galleryExpanded=!galleryExpanded;
  gallery.classList.toggle('expanded',galleryExpanded);
  galleryScroll.setAttribute('aria-expanded',String(galleryExpanded));
  const label=galleryExpanded?'Réduire la galerie':'Afficher toutes les photos';
  galleryScroll.setAttribute('aria-label',label);
  galleryScroll.title=label;
});
function showPhoto(index){
  currentPhoto=(index+photos.length)%photos.length;
  large.src=photos[currentPhoto].src;
  large.alt=photos[currentPhoto].alt || 'Portrait agrandi';
}
galleryButtons.forEach((button)=>button.addEventListener('click',()=>{
  showPhoto(Number(button.dataset.photo));
  lightbox.classList.add('open');
}));
function previousPhoto(){showPhoto(currentPhoto-1)}
function nextPhoto(){showPhoto(currentPhoto+1)}
function closeBox(){lightbox.classList.remove('open');large.src=''}
document.getElementById('closeLightbox').addEventListener('click',closeBox);
document.getElementById('prevPhoto').addEventListener('click',previousPhoto);
document.getElementById('nextPhoto').addEventListener('click',nextPhoto);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeBox()});
document.addEventListener('keydown',e=>{
  if(!lightbox.classList.contains('open')) return;
  if(e.key==='Escape') closeBox();
  else if(e.key==='ArrowLeft') previousPhoto();
  else if(e.key==='ArrowRight') nextPhoto();
});
