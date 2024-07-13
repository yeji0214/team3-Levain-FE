import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Intro.css'

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function changeTextLetter(spanElement, duration, callback) {
    const initText = spanElement.innerText;
    const textLength = spanElement.dataset.textValue.length;
    const totalFrames = duration / 10;
    let frame = 0;

    function animate() {
        spanElement.innerText = initText
            .split("")
            .map((letter, index) => {
                if (index < frame / (totalFrames / textLength)) {
                    return spanElement.dataset.textValue[index];
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        frame++;

        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        } else {
            if (callback) {
                callback();
            }
        }
    }

    requestAnimationFrame(animate);
}

const Intro = () => {
    useEffect(() => {
        const animTexts = document.querySelectorAll(".animated-text span");
        if (animTexts.length > 0) {
            changeTextLetter(animTexts[0], 1000, () => {
                if (animTexts.length > 1) {
                    changeTextLetter(animTexts[1], 1000);
                }
            });
        }
    }, []);

    return (
        <div className="wrapper">
            <div className="text-container">
                <h1 className="animated-text">
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span data-text-value="welcome to">welcome to</span><br />
                        <span data-text-value="Lèvain">Lèvain</span>
                    </Link>
                </h1>
            </div>
        </div>
    );
};

export default Intro;
