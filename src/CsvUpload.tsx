import { useState, useRef } from 'react';
import { useOptionsData } from './optionsData';
import './css/CsvUpload.css';

export default function CsvUpload() {
    const [isOpen, setIsOpen] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { loadCSV, resetToDefaults, isCustomData } = useOptionsData();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            await loadCSV(file);
            setFeedback(`Loaded "${file.name}" successfully!`);
            setFeedbackType('success');
        } catch {
            setFeedback('Failed to load CSV. Check the format and try again.');
            setFeedbackType('error');
        }

        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleReset = async () => {
        await resetToDefaults();
        setFeedback('Restored default entries.');
        setFeedbackType('success');
    };

    return (
        <div className="csv-upload-wrapper">
            <button
                className="csv-toggle-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Close' : 'Add your own options'}
            </button>

            {isOpen && (
                <div className="csv-upload-panel">
                    <div className="csv-instructions">
                        <p><strong>How to create the CSV file:</strong></p>
                        <p>
                            Create a <code>.csv</code> file with these four columns: <code>title</code>, <code>description</code>, <code>image</code>, and <code>tags</code>.
                        </p>
                        <p>
                            Use the pipe character (<code>|</code>) to add multiple tags, for example: <code>games|coop</code>. Wrap fields in double quotes if they contain commas. Refer to the Github Readme for a longer explanation.
                        </p>
                        <div className="csv-example">
                            <code>
                                title,description,image,tags<br />
                                Minecraft,Build a house,https://game.com/craft.png,games<br />
                                Inception,Watch this,https://movie.com/incep.png,movies<br />
                                One Piece,Enjoy,https://anime.com/op.jpg,shows|anime
                            </code>
                        </div>
                    </div>

                    <label className="csv-file-label">
                        Choose a .csv file
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="csv-file-input"
                        />
                    </label>

                    {isCustomData && (
                        <button className="csv-reset-button" onClick={handleReset}>
                            Reset to defaults
                        </button>
                    )}

                    {feedback && (
                        <p className={`csv-feedback csv-feedback-${feedbackType}`}>
                            {feedback}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
