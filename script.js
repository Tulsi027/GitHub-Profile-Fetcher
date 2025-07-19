const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("usernameInput");
const profile = document.getElementById("profile");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim();
  profile.style.display = "none";
  errorMsg.textContent = "";

  if (!username) {
    errorMsg.textContent = "Please enter a GitHub username.";
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);

    if (!res.ok) {
      throw new Error("User not found");
    }

    const data = await res.json();
    showProfile(data);
  } catch (error) {
    errorMsg.textContent = "GitHub user not found!";
  }
});

function showProfile(data) {
  profile.innerHTML = `
    <img src="${data.avatar_url}" alt="Avatar">
    <h2>${data.name || data.login}</h2>
    <p>${data.bio || "No bio available"}</p>
    <p>📍 ${data.location || "Unknown"}</p>
    <p>📦 Public Repos: ${data.public_repos}</p>
    <p>👥 Followers: ${data.followers} | Following: ${data.following}</p>
    <a href="${data.html_url}" target="_blank">Visit Profile</a>
  `;
  profile.style.display = "block";
}
