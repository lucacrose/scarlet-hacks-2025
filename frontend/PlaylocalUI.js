// Load Lucide icons
lucide.createIcons();

// Sidebar toggle placeholder
document.querySelector('[onclick*="Toggle Sidebar"]')?.addEventListener('click', () => {
  alert('Sidebar toggle coming soon!');
});

function setupSmoothRevealWithStagger(buttonId, extraId) {
  const btn = document.getElementById(buttonId);
  const extra = document.getElementById(extraId);

  btn.addEventListener("click", () => {
    const isOpen = extra.classList.contains("max-h-[1000px]");
    const items = extra.querySelectorAll(".staggered-item");

    if (isOpen) {
      // Hide container
      extra.classList.remove("max-h-[1000px]", "opacity-100", "scale-y-100");
      extra.classList.add("max-h-0", "opacity-0", "scale-y-95");

      // Hide all items instantly
      items.forEach((el) => {
        el.classList.remove("opacity-100", "translate-y-0");
        el.classList.add("opacity-0", "translate-y-2");
      });

    } else {
      // Show container
      extra.classList.remove("max-h-0", "opacity-0", "scale-y-95");
      extra.classList.add("max-h-[1000px]", "opacity-100", "scale-y-100");

      // Staggered animation: delay each by index * 100ms
      items.forEach((el, i) => {
        setTimeout(() => {
          el.classList.remove("opacity-0", "translate-y-2");
          el.classList.add("opacity-100", "translate-y-0");
        }, i * 100); // 100ms delay between items
      });

      btn.querySelector("span").textContent = isOpen ? "Show More" : "Show Less";
      btn.querySelector("i").setAttribute("data-lucide", isOpen ? "chevron-down" : "chevron-up");
    }

    lucide.createIcons();
  });
}

setupSmoothRevealWithStagger("showMoreEvents", "event-extra");
setupSmoothRevealWithStagger("showMoreBusinesses", "business-extra");

const toggleSidebar = () => {
  const sidebar = document.getElementById('sidePanel');
  const backdrop = document.getElementById('sidebarBackdrop');

  const isOpen = !sidebar.classList.contains('-translate-x-full');

  // Toggle sidebar
  sidebar.classList.toggle('-translate-x-full');

  // Toggle backdrop
  if (isOpen) {
    backdrop.classList.add('hidden');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
  } else {
    backdrop.classList.remove('hidden');
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
  }

  lucide.createIcons(); // Optional: refresh icons if needed
};

// Button click opens/closes
document.getElementById('toggleSidebar')?.addEventListener('click', toggleSidebar);

// Clicking the backdrop closes the sidebar
document.getElementById('sidebarBackdrop')?.addEventListener('click', toggleSidebar);

const openFriendsBtn = document.getElementById('openFriends');
const friendsModal = document.getElementById('friendsModal');
const friendsBackdrop = document.getElementById('friendsBackdrop');

const showFriendsModal = () => {
  friendsModal.classList.remove('hidden');
  friendsBackdrop.classList.remove('hidden');

  // Animate in
  setTimeout(() => {
    friendsModal.classList.add('opacity-100', 'scale-100');
    friendsModal.classList.remove('opacity-0', 'scale-95');

    friendsBackdrop.classList.add('opacity-100');
    friendsBackdrop.classList.remove('opacity-0');
  }, 10);
};

const hideFriendsModal = () => {
  friendsModal.classList.remove('opacity-100', 'scale-100');
  friendsModal.classList.add('opacity-0', 'scale-95');

  friendsBackdrop.classList.remove('opacity-100');
  friendsBackdrop.classList.add('opacity-0');

  // Hide completely after animation
  setTimeout(() => {
    friendsModal.classList.add('hidden');
    friendsBackdrop.classList.add('hidden');
  }, 300);
};

openFriendsBtn?.addEventListener('click', showFriendsModal);
friendsBackdrop?.addEventListener('click', hideFriendsModal);


