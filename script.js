const form = document.getElementById("contactForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("messageText").value.trim();

    // Validate fields
    if (!name || !email || !message) {
        msg.innerText = "⚠️ Please fill all fields!";
        msg.style.color = "yellow";
        return;
    }

    try {
        msg.innerText = "⏳ Sending message...";

        const res = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const result = await res.text();

        msg.innerText = result;
        msg.style.color = "lightgreen";

        // Reset form after success
        form.reset();

    } catch (error) {
        console.error("Error:", error);
        msg.innerText = "❌ Failed to send message!";
        msg.style.color = "red";
    }
});