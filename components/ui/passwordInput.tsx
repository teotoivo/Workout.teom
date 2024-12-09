"use client";

import React, { useState, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          ref={ref}
          className={cn("", className)}
          {...props}
        />
        <Button
          className="absolute right-0 top-0 hover:bg-transparent"
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          <p className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </p>
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
