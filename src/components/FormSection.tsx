
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  icon: ReactNode;
  children: ReactNode;
  index?: number;
}

const FormSection = ({
  title,
  description,
  icon,
  children,
  index = 0
}: FormSectionProps) => {
  return (
    <div 
      className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md animate-in"
      style={{ "--index": index } as React.CSSProperties}
    >
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            {description && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default FormSection;
