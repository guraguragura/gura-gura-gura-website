
import React from "react";
import { Link } from "react-router-dom";
import { MenuIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CategoryWithChildren } from "./useCategoriesData";

interface MobileMenuProps {
  categoriesWithChildren: CategoryWithChildren[];
  staticCategories: string[];
}

const MobileMenu = ({ categoriesWithChildren, staticCategories }: MobileMenuProps) => {
  return (
    <div className="md:hidden py-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center"
          >
            <MenuIcon className="h-5 w-5 mr-2" />
            Menu
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            {/* Categories Accordion */}
            <div>
              <h3 className="font-semibold mb-2 text-sm">Categories</h3>
              <Accordion type="single" collapsible className="w-full">
                {categoriesWithChildren.map(({ category, subcategories }) => (
                  subcategories.length > 0 ? (
                    <AccordionItem key={category.id} value={category.id}>
                      <AccordionTrigger className="text-sm py-2">
                        <Link 
                          to={`/categories/${category.handle}`}
                          className="flex-1 text-left hover:text-brand-teal"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {category.name}
                        </Link>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-4">
                          {subcategories.map((sub) => (
                            <li key={sub.id}>
                              <Link
                                to={`/categories/${sub.handle}`}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <div key={category.id} className="border-b">
                      <Link
                        to={`/categories/${category.handle}`}
                        className="block py-2 text-sm hover:text-brand-teal"
                      >
                        {category.name}
                      </Link>
                    </div>
                  )
                ))}
                
                {/* Static categories */}
                {staticCategories.map((category) => (
                  <div key={category} className="border-b">
                    <Link
                      to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-2 text-sm hover:text-brand-teal"
                    >
                      {category}
                    </Link>
                  </div>
                ))}
              </Accordion>
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <h3 className="font-semibold mb-2 text-sm">Quick Links</h3>
              <Link to="/business" className="block py-2 text-sm hover:text-brand-teal">
                For Business
              </Link>
              <Link to="/faq" className="block py-2 text-sm hover:text-brand-teal">
                Customer Services
              </Link>
              <Link to="/contact" className="block py-2 text-sm hover:text-brand-teal">
                Contact Us
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
