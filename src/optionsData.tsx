import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Option, parseCSV, getUniqueTags, filterByCategories } from './utils';

interface OptionsContextValue {
    options: Option[];
    loading: boolean;
    error: string | null;
    uniqueTags: string[];
    filterByCategories: (categories: string[]) => Option[];
    loadCSV: (file: File) => Promise<void>;
    resetToDefaults: () => Promise<void>;
    isCustomData: boolean;
}

const OptionsContext = createContext<OptionsContextValue | null>(null);

async function fetchDefaultOptions(): Promise<Option[]> {
    const basePath = import.meta.env.BASE_URL || '/';
    const response = await fetch(`${basePath}options.csv`);
    if (!response.ok) throw new Error('Failed to load default options');
    const text = await response.text();
    return parseCSV(text);
}

export function OptionsProvider({ children }: { children: ReactNode }) {
    const [options, setOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCustomData, setIsCustomData] = useState(false);

    // Load defaults on mount
    useEffect(() => {
        fetchDefaultOptions()
            .then(data => {
                setOptions(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const loadCSV = useCallback(async (file: File) => {
        try {
            setLoading(true);
            setError(null);
            const text = await file.text();
            const parsed = parseCSV(text);
            if (parsed.length === 0) {
                throw new Error('CSV file contained no valid entries');
            }
            setOptions(parsed);
            setIsCustomData(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to parse CSV');
        } finally {
            setLoading(false);
        }
    }, []);

    const resetToDefaults = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchDefaultOptions();
            setOptions(data);
            setIsCustomData(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load defaults');
        } finally {
            setLoading(false);
        }
    }, []);

    const value: OptionsContextValue = {
        options,
        loading,
        error,
        uniqueTags: getUniqueTags(options),
        filterByCategories: (categories: string[]) => filterByCategories(options, categories),
        loadCSV,
        resetToDefaults,
        isCustomData,
    };

    return (
        <OptionsContext.Provider value= { value } >
        { children }
        </OptionsContext.Provider>
  );
}

export function useOptionsData(): OptionsContextValue {
    const context = useContext(OptionsContext);
    if (!context) {
        throw new Error('useOptionsData must be used within an OptionsProvider');
    }
    return context;
}
