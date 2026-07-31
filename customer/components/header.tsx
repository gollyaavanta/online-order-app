'use client';

import { useState,useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {CartContext} from "../context/cartContext"
import {StoreContext} from "../context/authContext"
import {
  ShoppingCart,
  Menu,
  User as UserIcon,
  Package,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/#services' },
  { name: 'Contact', href: '/#contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
   
  // Demo user state (replace with your auth provider hook, e.g., useAuth() / useSession())
  // const [user, setUser] = useState<{ name: string; email: string } | null>({
  //   name: 'Karan Narode',
  //   email: 'karan@gmail.com',
  // });

  // Demo cart count state (replace with your global cart context state)
  const cartContext = useContext(CartContext);
  const cartCount = cartContext?.cartCount ?? 0;
  const {user, logout} = useContext(StoreContext) ?? {};

  

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Brand Logo Wrapper */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          <div className="relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary/5 p-1 transition-colors group-hover:bg-primary/10">
            <Image
              src={logo}
              alt="Gollya Avanta Logo"
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
              GOLLYA AVANTA
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase -mt-0.5">
              LLP
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-foreground after:w-full after:bg-primary'
                    : 'text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full after:bg-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions (Cart + User Profile / Auth) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart Icon Button */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative rounded-xl hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`View cart, ${cartCount} items`}
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground shadow-sm">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </Button>

          {/* User Profile Dropdown / Login */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-[120px] truncate text-sm font-semibold text-foreground">
                    {user.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 shadow-lg">
                <DropdownMenuLabel className="font-normal p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link href="/account/profile" className="flex items-center gap-2 py-2">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem> */}

                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link href="/account/orders" className="flex items-center gap-2 py-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>

              

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="rounded-lg cursor-pointer text-destructive focus:text-destructive py-2"
                  onSelect={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-xcenter gap-2">
              <Button asChild variant="ghost" size="sm" className="rounded-xl">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="rounded-xl">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Controls (Cart & Drawer Toggle) */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative rounded-xl hover:bg-accent"
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent rounded-xl">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-[300px] sm:w-[340px] flex flex-col p-6">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              
              {/* Mobile Drawer Header: User Summary */}
              {user ? (
                <div className="flex items-center gap-3 pt-4 pb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="truncate text-sm font-semibold text-foreground">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              ) : (
                <div className="pt-4 pb-2">
                  <p className="text-sm font-semibold text-foreground">Welcome to Gollya Avanta</p>
                  <p className="text-xs text-muted-foreground">Sign in to manage your orders</p>
                </div>
              )}

              <Separator className="my-4" />

              {/* Navigation Links */}
              <div className="flex flex-col space-y-1">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                  Menu
                </p>
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium text-foreground/80 hover:text-primary py-2.5 px-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              {/* Account Options in Drawer */}
              {user && (
                <>
                  <Separator className="my-4" />
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                      Account
                    </p>
                    <SheetClose asChild>
                      <Link
                        href="/account/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 text-sm font-medium text-foreground/80 hover:text-primary py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        My Profile
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/account/orders"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 text-sm font-medium text-foreground/80 hover:text-primary py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Package className="h-4 w-4 text-muted-foreground" />
                        My Orders
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/account/settings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 text-sm font-medium text-foreground/80 hover:text-primary py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        Settings
                      </Link>
                    </SheetClose>
                  </div>
                </>
              )}

              {/* Footer / Auth Actions */}
              <div className="mt-auto pt-4 border-t border-border">
                {user ? (
                  <Button
                    variant="destructive"
                    className="w-full justify-center gap-2 rounded-xl"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="w-full rounded-xl">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          Login
                        </Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className="w-full rounded-xl">
                        <Link href="/register" onClick={() => setIsOpen(false)}>
                          Register
                        </Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}