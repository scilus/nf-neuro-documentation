import { getCollection } from "astro:content";

// Helper function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Order of top-level items
const TOP_LEVEL_ORDER = [
  "getting-started",
  "guides",
  "modules",
  "subworkflows"
];

// Order for items within the "guides" section
const GUIDES_ORDER = [
  "basic_environment",
  "setup_environment",
  "nfneuro_devcontainer",
  "modules",
  "subworkflows",
  "prototyping",
  "production"
];

/**
 * Recursively builds a structured sidebar from content files.
 */
async function generateSidebar() {
  const docs = await getCollection("docs");

  const sidebar = {};

  for (const doc of docs) {
    const parts = doc.slug.split("/"); // Split file path into categories
    const title = doc.data.title || doc.slug.split("/").pop().replace(/-/g, " "); // Use frontmatter title if available

    let current = sidebar;
    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] =
          index === parts.length - 1 ? { href: doc.slug, label: capitalizeFirstLetter(title) } : {};
      }
      current = current[part];
    });
  }

  // Reorder the top-level items and sub-items within "guides"
  return reorderItems(sidebar);
}

/**
 * Reorder top-level items and sub-items within sections (e.g., guides).
 */
function reorderItems(sidebar) {
  const orderedSidebar = {};

  // Reorder top-level items based on the custom order
  TOP_LEVEL_ORDER.forEach((key) => {
    if (sidebar[key]) {
      // If the section is "guides", apply custom order to its items
      if (key === "guides" && sidebar[key]) {
        sidebar[key] = reorderSubItems(sidebar[key], GUIDES_ORDER);
      }
      orderedSidebar[key] = sidebar[key];
    }
  });

  // Add any other items not explicitly defined in the custom order
  Object.entries(sidebar).forEach(([key, value]) => {
    if (!TOP_LEVEL_ORDER.includes(key)) {
      orderedSidebar[key] = value;
    }
  });

  return transformToArray(orderedSidebar);
}

/**
 * Reorder items within a section based on a custom order.
 */
function reorderSubItems(section, order) {
  const reorderedItems = {};
  
  // Reorder sub-items within a section (e.g., guides)
  order.forEach((key) => {
    if (section[key]) {
      reorderedItems[key] = section[key];
    }
  });

  // Add any other items not explicitly defined in the custom order
  Object.entries(section).forEach(([key, value]) => {
    if (!order.includes(key)) {
      reorderedItems[key] = value;
    }
  });

  return reorderedItems;
}

/**
 * Convert nested object to array format for easier rendering.
 */
function transformToArray(obj) {
  return Object.entries(obj).map(([key, value]) => {
    if (typeof value === "object" && !value.href) {
      return { label: capitalizeFirstLetter(key), children: transformToArray(value) };
    }
    return { label: value.label || capitalizeFirstLetter(key.replace(/-/g, " ")), href: `/${value.href}` };
  });
}

export { generateSidebar };
