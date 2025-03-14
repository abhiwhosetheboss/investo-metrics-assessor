
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, FileText } from "lucide-react";

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value?: File | null;
  onChange?: (file: File | null) => void;
  onClear?: () => void;
  buttonText?: string;
  dropzoneText?: string;
  accept?: string;
  className?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ 
    className, 
    value, 
    onChange, 
    onClear,
    buttonText = "Select file", 
    dropzoneText = "or drag and drop", 
    accept = "*/*",
    ...props 
  }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    
    // Handle click on the button
    const handleButtonClick = () => {
      inputRef.current?.click();
    };
    
    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onChange?.(files[0]);
      }
    };
    
    // Handle drag events
    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };
    
    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };
    
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onChange?.(files[0]);
      }
    };
    
    // Handle clear button click
    const handleClear = () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      onChange?.(null);
      onClear?.();
    };
    
    return (
      <div className={cn("space-y-2", className)}>
        {!value ? (
          <div
            className={cn(
              "border-2 border-dashed rounded-md p-6 transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-muted",
              "text-center cursor-pointer"
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleButtonClick}
          >
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="h-10 w-10 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{buttonText}</p>
                <p className="text-xs text-muted-foreground">{dropzoneText}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border rounded-md p-4 bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium truncate">{value.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(value.size / 1024 / 1024).toFixed(2)} MB • {value.type || "Unknown type"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        <input
          type="file"
          ref={(el) => {
            // Set both refs
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
            inputRef.current = el;
          }}
          className="hidden"
          onChange={handleFileChange}
          accept={accept}
          {...props}
        />
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };
