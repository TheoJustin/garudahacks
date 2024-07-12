import { Checkbox } from "./ui/checkbox";

export default function CheckboxWithLabel({
    label,
    className,
} : Readonly<{
    label: string,
    className?: string,
}>) {
    return (
        <label className={`flex items-center ${className}`}>
            <Checkbox id="check"/>
            <label className="ml-2" htmlFor="check">{label}</label>
        </label>
    )
}