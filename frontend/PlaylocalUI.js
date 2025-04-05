// Load Lucide icons
lucide.createIcons();

// Sidebar toggle placeholder
document.querySelector('[onclick*="Toggle Sidebar"]')?.addEventListener('click', () => {
  alert('Sidebar toggle coming soon!');
});

// Handle "Show More" for Social Events and Local Businesses
document.querySelectorAll('button').forEach((btn) => {
  if (btn.textContent.includes("Show More")) {
    btn.addEventListener('click', () => {
      const section = btn.closest('div');
      const newCard = `
        <div class="bg-white shadow rounded-lg p-4">
          <div class="text-sm text-green-600 font-semibold flex items-center gap-2">
            <i data-lucide="landmark" class="w-4 h-4"></i> New Park Meetup
          </div>
          <div class="text-sm text-gray-700 mt-2">
            A freshly loaded social/business event from JS
          </div>
        </div>
      `;
      const insertTarget = section.querySelector('.space-y-4');
      if (insertTarget) {
        insertTarget.insertAdjacentHTML('beforeend', newCard);
        lucide.createIcons(); // Re-render icons
      }
    });
  }
});