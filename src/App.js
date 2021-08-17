import React, {useState} from "react"
import './App.css';
import './reset.css';
import './fonts.css';
import Modal from './Modal/Modal';

function App() {

    let sum = 260000;

    let minSalary = 12130;

    let arrayNumber = [];

    const [modalActive, setModalActive] = useState(false);

    const [counter, setCounter] = useState(0);

    const [text, setText] = useState('');

    const onChangeHandler = event => {
        setCounter(+event.target.value);
    };

    const [quarterData, setQuarterData] = useState([]);

    const calculationHandler = event => {
        if ((counter > minSalary) && (counter < sum)) {
            setText('Итого можете внести в качестве досрочных:');
            let newCounter = counter * 12 * 0.13;
            while (sum > newCounter) {
                sum = sum - newCounter;
                arrayNumber.push(newCounter);
            }
            arrayNumber.push(sum.toFixed(2));
            setQuarterData([...arrayNumber]);
        } else if (counter > sum) {
            setQuarterData(["260000"]);
        } else {
            setText('');
            setQuarterData([]);
        }
    };

    console.log(quarterData.length)

    return (
        <div className={modalActive ? "content active" : "content"}>

            <Modal active={modalActive} setActive={setModalActive}>
                <span className="close" onClick={() => setModalActive(false)}></span>
                <h4 className="modal__head">Налоговый вычет</h4>
                <p className="modal__paragraph">Используйте налоговый вычет чтобы погасить ипотеку досрочно. <br/> Размер налогового вычета составляет не более 13% от своего официального годового дохода.</p>
                <label htmlFor="" className="modal__label">Ваша зарплата в месяц</label>
                <input type="number" className="modal__input" onChange={onChangeHandler} placeholder="Введите сумму от 12130" />
                <button onClick={calculationHandler} className="modal-calculation__btn">Рассчитать</button>
                <div className="modal-quad-block">
                    <span className="modal-quad-block__text"> {text}</span>
                    {

                        quarterData.length >= 1 ?
                        quarterData.map((item, i) => (
                        <div className="modal-quad-block__money" key={i}>
                            <input type="checkbox" className="custom-checkbox" id={i + 1} name="happy" value="yes" />
                            <label htmlFor={i + 1}>{item} рублей в {i + 1}-й год</label>
                        </div>
                    )) :
                        ""
                    }
                </div>
                <div className="modal-decrease">
                    <span className="modal-decrease__clarification">Что уменьшаем?</span>
                    <button className="modal-decrease__payment-btn">Платёж</button>
                    <button className="modal-decrease__term-btn">Срок</button>
                </div>
                <button className="modal-add">Добавить</button>
            </Modal>
            <button className="tax-deduction-btn" onClick={() => setModalActive(true)}>Налоговый вычет</button>
        </div>
    );
}

export default App;
