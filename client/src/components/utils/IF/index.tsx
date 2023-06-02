interface IFProps {
    condition: boolean;
    elseOther?: React.ReactNode;
    children: React.ReactNode;
}

export default function IF({ condition, elseOther = null, children }: IFProps) {

    if (condition) {
        return <>{children}</>;
    } else {
        return <>{elseOther}</>;
    }
}