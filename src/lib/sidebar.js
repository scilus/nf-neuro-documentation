import { getCollection } from "astro:content";

// Helper function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str) => {
  if (!str) return str;
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Order of top-level items
const TOP_LEVEL_ORDER = ["getting-started", "guides", "subworkflows"];

// Define custom orders for sections and their nested sub-sections
const SECTION_ORDERS = {
  guides: [
    "create-your-module",
    "basic_environment",
    "setup_environment",
    "nfneuro_devcontainer",
    "subworkflows",
    "prototyping",
    "production",
  ],
  "guides/create-your-module": [
    "template",
    "main",
    "documentation",
    "tests",
    "arguments",
    "submit",
    "infrastructure",
    "resources",
  ],
};

/**
 * Recursively builds a structured sidebar from content files.
 */
async function generateSidebar() {
  const docs = await getCollection("docs");

  const sidebar = {};

  for (const doc of docs) {
    const parts = doc.slug.split("/"); // Split file path into categories
    const title = doc.data.title || capitalizeFirstLetter(doc.slug.split("/").pop());

    let current = sidebar;
    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] =
          index === parts.length - 1 ? { href: `/${doc.slug}`, label: title } : {};
      }
      current = current[part];
    });
  }

  // Reorder items recursively and return the transformed array
  return transformToArray(reorderItems(sidebar, []));
}

/**
 * Recursively reorders items based on custom-defined orders.
 */
function reorderItems(sidebar, path) {
  const orderedSidebar = {};

  // Determine the section key (e.g., "guides/modules")
  const sectionKey = path.length ? path.join("/") : null;
  const order = sectionKey ? SECTION_ORDERS[sectionKey] : TOP_LEVEL_ORDER;

  if (order) {
    order.forEach((key) => {
      if (sidebar[key]) {
        orderedSidebar[key] =
          typeof sidebar[key] === "object" && !sidebar[key].href
            ? reorderItems(sidebar[key], [...path, key])
            : sidebar[key];
      }
    });
  }

  // Add any other items not explicitly defined in the custom order
  Object.entries(sidebar).forEach(([key, value]) => {
    if (!order || !order.includes(key)) {
      orderedSidebar[key] =
        typeof value === "object" && !value.href ? reorderItems(value, [...path, key]) : value;
    }
  });

  return orderedSidebar;
}

/**
 * Convert structured sidebar object to an array for rendering.
 */
function transformToArray(obj) {
  return Object.entries(obj).map(([key, value]) => {
    if (typeof value === "object" && !value.href) {
      return {
        label: capitalizeFirstLetter(key),
        children: transformToArray(value),
      };
    }
    return {
      label: value.label || capitalizeFirstLetter(key),
      href: value.href,
    };
  });
}

export { generateSidebar };
