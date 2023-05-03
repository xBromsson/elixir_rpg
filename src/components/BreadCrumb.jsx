import React, { useMemo } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const Breadcrumb = () => {
  const location = useLocation();

  const breadcrumbItems = useMemo(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    const breadcrumbPaths = paths.map(
      (_, index) => `/${paths.slice(0, index + 1).join("/")}`
    );
    const breadcrumbLabels = paths.map((path) => capitalize(path));

    return breadcrumbPaths.map((path, index) => ({
      path,
      label: breadcrumbLabels[index],
    }));
  }, [location]);

  return (
    <ChakraBreadcrumb>
      {breadcrumbItems.map(({ path, label }, index) => (
        <BreadcrumbItem key={path}>
          <BreadcrumbLink as={RouterLink} to={path}>
            {label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};

export default Breadcrumb;
