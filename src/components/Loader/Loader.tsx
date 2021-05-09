import * as React from 'react';
import { LoaderStyled } from './Loader.styled';
import { useThemeContext } from '../Theme';
import * as sizes from '../../styles/dclSizes.json';

export interface LoaderProps {
    a11yId: string;
    className?: string;
    size?: number;
    type?: 'primary' | 'secondary';
    brandColour?: string;
    isLoading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
    a11yId,
    type = 'primary',
    brandColour,
    className,
    isLoading = true,
    size
}) => {
    if (!isLoading) {
        return null;
    }

    const { brandColour: dclBrandColour } = useThemeContext();
    return (
        <LoaderStyled
            className={className}
            classes={{
                root: 'dclLoader',
                svg: 'dclLoader__svg'
            }}
            brandcolour={type === 'primary' && (brandColour || dclBrandColour)}
            color={type}
            size={size ? `${size}px` : sizes.spacing.factor4.s6}
            id={a11yId}
        />
    );
};

export default Loader;
