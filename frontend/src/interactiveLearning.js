export function createUser(email) {
  fetch("http://localhost:3001/createUser", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 200) {
      console.log("User created successfully");
    } else {
      console.log("Error creating user");
    }
  });
}

export function updateLeetcodeId(email, leetcodeId) {
  fetch("http://localhost:3001/updateLeetcodeId", {
    method: "PUT",
    body: JSON.stringify({ email, leetcodeId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 200) {
      console.log("Leetcode ID updated successfully");
    } else {
      console.log("Error updating Leetcode ID");
    }
  });
}