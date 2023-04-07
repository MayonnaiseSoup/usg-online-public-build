

let data
let allData


function enrolUser() {
    data = document.getElementById("uname").value
    allData = {"name": data}

    console.log(allData)

    fetch("https://usg.onrender.com/newPlayer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(allData)
    })
    .then(response => {
        if (response.ok) {
            start()
        } else if (response.status == 400) {
            console.error("Username is already taken!")
            
            document.getElementById("points").innerHTML = "Sorry! That username is already taken!";
            document.getElementById("points").style.setProperty("opacity", 1)
        } else {
            document.getElementById("points").innerHTML = "Sorry, an error has occurred!";
            document.getElementById("points").style.setProperty("opacity", 1)

            console.error("An error occurred.")
        }
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error(error)
    })
}

function start() {

    setInterval(updateScoreboard, 3000)
    setInterval(getScoreBoard, 4000)
    var newDiv = document.createElement("div");
    
    // Set the class attribute of the new div element to "emptySpace"
    newDiv.setAttribute("class", "emptySpace");
    
    // Append the new div element to the body
    document.body.appendChild(newDiv);
    document.getElementById("points").innerHTML = "Scrollering points: " + window.scrollY;

    document.getElementById("points").style.setProperty("opacity", 1)
    document.getElementById("boardText").style.setProperty("opacity", 1)
    document.getElementById("mainForm").remove()



    window.addEventListener('scroll', function() {

        document.getElementById("points").innerHTML = "Scrollering points: " + window.scrollY;
    
    
        if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight) {
            // User has reached the end of the page
            // Create a new div element
            var newDiv = document.createElement("div");
    
            // Set the class attribute of the new div element to "emptySpace"
            newDiv.setAttribute("class", "emptySpace");
    
            // Append the new div element to the body
            document.body.appendChild(newDiv);
    
        }
    });
}



function updateScoreboard() {

    allData = {"name": data, "value": window.scrollY}

    fetch("https://usg.onrender.com/updateScore", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(allData)
    })
}




window.addEventListener("beforeunload", function(event) {
    fetch("https://usg.onrender.com/delPlayer", {
        method: "DELETE",
        body: JSON.stringify(allData),
        headers: {
            "Content-type": "application/json"
        }
    })
    
  
    
})

function getScoreBoard() {
    fetch("https://usg.onrender.com/listScores")
        .then(response => response.json())
        .then(data => {

            document.getElementById("leadboard").innerHTML = ""

            ol = document.getElementById("leadboard")
            let counter = 0

            for (const key in data) {
                if (counter >= 5) {
                    break
                }

                li = document.createElement("li")
                li.textContent = `${key}: ${data[key]}`
                ol.appendChild(li)


                // console.log(`${key}: ${data[key]}`)
            }
        })
        .catch(error => console.error(error))
}


