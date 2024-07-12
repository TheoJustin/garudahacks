export const sendData = async (data: String) => fetch('/api/email', {
    method: "POST",
    body: JSON.stringify(data),
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})