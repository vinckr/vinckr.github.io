document.addEventListener("DOMContentLoaded", () => {
  const ocean = document.getElementById("ocean");

  // Bubbles
  for (let i = 0; i < 77; i++) {
    createBubble();
  }
  function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.bottom = "0";
    bubble.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random float duration between 5s and 10s
    ocean.appendChild(bubble);

    // Remove the bubble after the animation ends and create a new one
    bubble.addEventListener("animationend", () => {
      bubble.remove();
      createBubble();
    });
  }

  // Fish
  const fishData = [
    { emoji: "🐙", link: "#", description: "Links" },
    { emoji: "🐋", link: "#", description: "Music" },
    { emoji: "🐬", link: "#", description: "Movies" },
    { emoji: "🐬", link: "#", description: "Books" },
    { emoji: "🐬", link: "#", description: "Wikipedia" },
    { emoji: "🐬", link: "#", description: "Quotes" },
    { emoji: "🐬", link: "#", description: "Recipes" },
    { emoji: "🐬", link: "#", description: "Personal Websites" },
    { emoji: "🦈", link: "#", description: "Git" },
    { emoji: "🦭", link: "#", description: "Munich Tips" },
    { emoji: "🐠", link: "#", description: "Kuba 2023" },
    { emoji: "🪼", link: "#", description: "Vale Tutorial" },
    { emoji: "🪼", link: "#", description: "Encrypt Git-dir" },
    { emoji: "🐡", link: "#", description: "How to live" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    { emoji: "🐟", link: "#", description: "04-2022" },
    // Add more fish data here
  ];
  /* Post types  
  [
    { emoji: "🐙", link: "#", description: "External links to interesting resources" },
    { emoji: "🐋", link: "#", description: "Recommendation for a great web page" },
    { emoji: "🐬", link: "#", description: "Recommendation for a helpful web page" },
    { emoji: "🦈", link: "#", description: "Recommendation for a helpful web page (technical topic)" },
    { emoji: "🦭", link: "#", description: "Recommendation for a helpful local resource" },
    { emoji: "🐠", link: "#", description: "Travel article or experience" },
    { emoji: "🪼", link: "#", description: "Technical article or tutorial" },
    { emoji: "🐡", link: "#", description: "Article or post about hot air ballooning" }, 
    { emoji: "🦑", link: "#", description: "Article or post with insightful, intelligent content" },
    { emoji: "🐟", link: "#", description: "Monthly blog post or update" },
    { emoji: "🦀", link: "#", description: "Off-topic or humorous post" },
    { emoji: "🦐", link: "#", description: "Draft, idea, or note (not a full post)" } 
  ] 
    */

  const fishList = []; // Array to store fishes

  fishData.forEach((data) => {
    createFish(data);
  });
  function getSizeClass(emoji) {
    switch (emoji) {
      case "🦀": // Crab
      case "🦐": // Shrimp
      case "🐟": // Fish
        return "small"; // Assign a size for these emojis
      case "🐠": // Tropical fish
      case "🐡": // Blowfish
      case "🦀": // Crab
      case "🪼": // Jellyfish
        return "medium"; // Assign a size for these emojis
      case "🐬": // Dolphin
      case "🦈": // Shark
      case "🦭": // Seal
        return "big"; // Assign a larger size for these emojis
      case "🐙": // Octopus
      case "🦑": // Squid
      case "🐳": // Whale
      case "🐋": // Blue whale
        return "large"; // Assign a larger size for these emojis
      default:
        return ""; // Default case, no specific size class
    }
  }

  function createFish(data) {
    const fish = document.createElement("div");
    fish.classList.add("fish");

    const sizeClass = getSizeClass(data.emoji);
    if (sizeClass) {
      fish.classList.add(sizeClass);
    }

    fish.innerHTML = data.emoji;

    let x, y;
    do {
      x = Math.random() * 90; // X position between 0% and 90%
      y = 20 + Math.random() * 60; // Y position between 20% and 60%
    } while (isOverlapping(x, y));

    fish.style.left = `${x}%`;
    fish.style.bottom = `${y}%`;

    fish.dataset.link = data.link;
    fish.dataset.description = data.description;
    fish.addEventListener("click", () => {
      window.location.href = fish.dataset.link;
    });
    fish.addEventListener("mouseover", () => {
      showDescription(fish.dataset.description, fish);
    });
    fish.addEventListener("mouseout", hideDescription);
    ocean.appendChild(fish);

    console.log("Creating fish:", fish); // Log the fish element
    console.log("Fish position:", fish.style.left, fish.style.bottom); // Log position
    fishList.push({ x, y });

    animateFish(fish, x);
  }

  function isOverlapping(newX, newY) {
    const minDistance = 10; // Minimum distance in percentage of ocean width
    for (const fish of fishList) {
      const distance = Math.sqrt((fish.x - newX) ** 2 + (fish.y - newY) ** 2);
      if (distance < minDistance) {
        return true; // Overlapping
      }
    }
    return false; // Not overlapping
  }

  function animateFish(fish, initialX) {
    let swimmingRight = initialX < 45; // Determine initial direction based on position
    // Set random speed for each fish
    const randomSpeed = Math.random() * 40 + 50; // Generate random value between 50s and 90s
    fish.style.setProperty("--transition-speed", `${randomSpeed}s`);

    function swim() {
      if (swimmingRight) {
        fish.style.left = "95%";
        fish.style.transform = "scaleX(-1)"; // Face left
      } else {
        fish.style.left = "5%";
        fish.style.transform = "scaleX(1)"; // Face right (flip)
      }
      swimmingRight = !swimmingRight;
    }

    function addRandomVerticalMovement(fish) {
      const randomDelay = Math.random() * 4000; // 0 to 2 seconds

      setTimeout(() => {
        fish.style.animation = `bobbing 4s ease-in-out infinite`;
      }, randomDelay);
    }
    setInterval(() => addRandomVerticalMovement(fish), 2000);

    const initialDelay = Math.random() * 2000; // Random initial delay up to 2 seconds
    const swimInterval = 15000 + Math.random() * 75000; // Random swim interval
    console.log("Initial delay:", initialDelay);
    console.log("Swim interval:", swimInterval);

    setTimeout(() => {
      swim(); // Start the initial swim
      setInterval(swim, swimInterval); // Continue the swim at random intervals
    }, initialDelay);

    setInterval(10000);
  }

  function showDescription(description, fish) {
    const descriptionBox = document.createElement("div");
    descriptionBox.classList.add("description");
    descriptionBox.innerHTML = description;
    descriptionBox.style.position = "absolute";
    descriptionBox.style.bottom = "10%";
    descriptionBox.style.left = "50%";
    descriptionBox.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    descriptionBox.style.padding = "10px";
    descriptionBox.style.borderRadius = "5px";

    const existingH2 = document.querySelector("h2");
    if (existingH2) {
      existingH2.textContent = "Click the fish again to go to: " + description;
    }
    ocean.appendChild(descriptionBox);
    fish.descriptionBox = descriptionBox;
  }

  function hideDescription(event) {
    if (event.target.descriptionBox) {
      event.target.descriptionBox.remove();
      event.target.descriptionBox = null;
    }
  }
});
