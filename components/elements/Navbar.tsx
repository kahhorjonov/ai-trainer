"use client";

import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Speak", href: "/speak" },
    { label: "Listen", href: "/" },
    { label: "Write", href: "/write" },
  ];

  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { md: "flex" }, gap: 3 }}>
            {links.map((link, idx) => (
              <Button
                key={link.href}
                disabled={idx === 0 || idx === 2}
                className={classNames({
                  underline: link.href === currentPath,
                })}
              >
                <Link
                  href={link.href}
                  className={classNames({
                    "hover:text-zinc-800": true,
                    "text-zinc-900": link.href === currentPath,
                  })}
                >
                  {link.label}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
