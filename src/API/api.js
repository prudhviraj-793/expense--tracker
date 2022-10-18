export async function signup(user) {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data.idToken);
}

export async function login(user) {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("check email/password");
  }
  const data = await response.json();
  return data;
}

export async function updateProfile(details) {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
}

export async function getUsers() {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      idToken: localStorage.getItem("user@mail.com"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const user = {
    displayName: data.users[0].displayName,
    photoUrl: data.users[0].photoUrl,
  };
  return user;
}
