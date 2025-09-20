import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const labelMap = {
    notes: "Notes",
    add: "AddNote",
    edit: "EditNote",
    profile: "Profile",
  };

  return (
    <nav className="text-sm text-gray-500 mb-4">
      <Link to="/" className="hover:underline text-blue-600">
        HomePage
      </Link>
      {pathnames.map((value, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        let label = labelMap[value];
        if (!label) {
          const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

          if (uuidRegex.test(value)) {
            
            label = isLast ? "ViewNote" : null;
          } else {
            label = value.charAt(0).toUpperCase() + value.slice(1);
          }
        }

        
        if (!label) return null;

        return (
          <span key={routeTo}>
            <span className="mx-2">/</span>
            {isLast ? (
              <span className="font-medium text-gray-800">{label}</span>
            ) : (
              <Link to={routeTo} className="hover:underline text-blue-600">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
