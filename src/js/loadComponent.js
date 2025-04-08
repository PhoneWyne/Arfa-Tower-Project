export async function loadComponent(componentPath, targetId) {
    try {
      const response = await fetch(componentPath);
      const content = await response.text();
      document.getElementById(targetId).innerHTML = content;
    } catch (error) {t
      console.error(`Error loading ${componentPath}:`, error);
    }
  }
  
