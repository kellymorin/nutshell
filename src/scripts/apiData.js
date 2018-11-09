const URL = "http://localhost:8088/"

const API = {
  getAllCategory(category) {
    return fetch(`${URL}${category}`)
      .then(entries => entries.json())
  },

  getOneFromCategory(category, id) {
    return fetch(`${URL}${category}?id=${id}`)
      .then(inputs => inputs.json())
  },

  saveItem(category, item){
    return fetch(`${URL}${category}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    }
    )
  }
};

export default API