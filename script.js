// ==========================================================================
// TIE TECH SMART CLIENT-SIDE SEARCH FILTER
// ==========================================================================

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("categorySearch");
    if (!searchInput) return; // Only runs on pages with a search input

    const problemCards = document.querySelectorAll(".problem-card");
    const bannerLink = document.getElementById("bannerActionLink");

    searchInput.addEventListener("input", function(e) {
        const query = e.target.value.toLowerCase().trim();
        let totalMatchesFound = 0;

        problemCards.forEach(card => {
            const cardTitle = card.querySelector("h3").textContent.toLowerCase();
            const links = card.querySelectorAll(".article-links-list li");
            let cardHasMatch = false;

            // Check if user search matches the broad group title (e.g. "Audio")
            if (cardTitle.includes(query)) {
                cardHasMatch = true;
                // Show all links inside this matched group
                links.forEach(link => link.style.display = "block");
            } else {
                // Otherwise check individual issue titles inside this group
                links.forEach(link => {
                    const text = link.textContent.toLowerCase();
                    if (text.includes(query)) {
                        link.style.display = "block";
                        cardHasMatch = true;
                    } else {
                        link.style.display = "none";
                    }
                });
            }

            // Dynamically show or completely slide away the problem card block
            if (cardHasMatch) {
                card.style.display = "block";
                totalMatchesFound++;
            } else {
                card.style.display = "none";
            }
        });

        // Loop Interaction Rule: If nothing matches, point them to the top request form link
        if (query.length > 0 && totalMatchesFound === 0) {
            if (bannerLink) {
                bannerLink.style.color = "#ff3333"; // Changes link color to subtle warning red
                bannerLink.textContent = "Nothing matches? Click here to layout your exact issue details!";
            }
        } else {
            // Restore normal action wording when content returns or input clears
            if (bannerLink) {
                bannerLink.style.color = "";
                bannerLink.textContent = "Lay your exact issue details here, and we'll create a solution for it soon.";
            }
        }
    });
});