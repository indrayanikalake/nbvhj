let lastActivityTime = null;

function updateLastUserActivityTime() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      lastActivityTime = new Date();
      resolve();
    }, 1000);
  });
}
const posts = [];

function createPost(title) {
  const post = { title };
  posts.push(post);
  return Promise.all([
    updateLastUserActivityTime(),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(post);
      }, 1000);
    })
  ]);
}
createPost("Post 1")
  .then(([_, post1]) => {
    console.log("Posts:", posts);
    console.log("Last activity time:", lastActivityTime);
    return createPost("Post 2");
  })
  .then(([_, post2]) => {
    console.log("Posts:", posts);
    console.log("Last activity time:", lastActivityTime);
    return Promise.all([
      deletePost(),
      updateLastUserActivityTime()
    ]);
  })
  .then(([deletedPost, _]) => {
    console.log("Deleted post:", deletedPost);
    console.log("Posts:", posts);
    console.log("Last activity time:", lastActivityTime);
  })
  .catch(error => console.error(error));

function deletePost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (posts.length > 0) {
        const deletedPost = posts.pop();
        resolve(deletedPost);
      } else {
        reject("ERROR: ARRAY IS EMPTY");
      }
    }, 1000);
  });
}
