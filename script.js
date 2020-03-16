;(function () {
  
  const script = document.querySelector('script[data-tinycomment-path]');

  if (script == null) {
    console.warn('TinyComment: No [data-tinycomment-path] attribute found in script tag');
    return false;
  }

  const API_PATH = script.dataset.tinycommentPath;
  const API_URL = API_PATH + '/api.php';
  const PAGE = window.location.host + window.location.pathname;

  const target = document.querySelector('[data-tinycomment]');

  if (target == null) {
    console.warn('TinyComment: target [data-tinycomment] is null');
    return false;
  }

  var commentForm = null;
  var commentList = null;

  function loadStyle() {
    const style = document.createElement('link');
    style.href = API_PATH + '/style.css';
    style.rel = 'stylesheet';
    document.head.appendChild(style);
  }

  function createForm() {
    let form = `
      <div class="form">
        <div>
          <label>Name</label>
          <input type="text" name="name" required">
        </div>
        <div>
          <label>Tell your opinion</label>
          <textarea name="comment"></textarea>
        </div>
        <div>
          <button type="button" name="submit">Send Comment</button>
        </div>
      </div>
    `;
    commentForm.innerHTML = form;
    formSubmit();
  }


  function formSubmit() {
    const submitBtn = commentForm.querySelector('button[name="submit"]');

    submitBtn.addEventListener('click', async function() {

      const inputName = commentForm.querySelector('input[name="name"]');
      const inputComment = commentForm.querySelector('textarea[name="comment"]');

      if (inputName.value.trim() == '' || inputComment.value.trim() == '') {
        alert('Please fill all the field!');
        return false;
      }

      const formData = new FormData();
      formData.append('name', inputName.value.trim());
      formData.append('comment', inputComment.value.trim());
      formData.append('submit', true);

      formData.append('page', PAGE);

      const req = await fetch(API_URL, {
        method: 'POST',
        body: formData 
      });
      
      const resp = await req.json();

      if (resp.status == 'success') {
        loadComments();
        inputName.value = '';
        inputComment.value = '';
        alert('Hooray! We have got your comment!');
      } else {
        alert('Cannot send your comment!');
      }

    });
    
  }

  async function loadComments() {

    const commentTmpl = `
      <article>
        <header>
          <p class="name">{{ name }}</p>
          <time>{{ date }}</time>
        </header>
        <p class="comment">{{ comment }}</p>
      </article>
    `;

    const req = await fetch(API_URL + '?page=' + PAGE);
    const resp = await req.json(); 

    var commentItem = '';

    if (resp.status == 'success') {
      const data = resp.data;
      for (let i in data) {
        commentItem += commentTmpl.replace('{{ name }}', data[i].name)
                                  .replace('{{ date }}', data[i].recieved_at)
                                  .replace('{{ comment }}', data[i].comment)
      }
    }

    commentList.innerHTML = commentItem;
  }

  function init() {
    const htmlSkeleton = `
      <div class="comment-form"></div>
      <div class="comment-list"></div>
    `;

    target.innerHTML = htmlSkeleton;
    commentForm = target.querySelector('.comment-form');
    commentList = target.querySelector('.comment-list');
    
    loadStyle();
    createForm();
    loadComments();
  }

  return init();
  
})();
