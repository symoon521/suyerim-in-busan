"use client";

import { useState } from "react";
import { budget } from "../app/data";

export default function Budget() {
  const [people, setPeople] = useState(1);
  const perPerson = budget.items.reduce((s, b) => s + b.amount, 0);
  const max = Math.max(...budget.items.map((b) => b.amount));
  const total = perPerson * people;

  return (
    <div className="budget__box">
      <div className="people">
        <span className="people__label">인원</span>
        <div className="people__ctrl">
          <button
            aria-label="인원 줄이기"
            onClick={() => setPeople((p) => Math.max(1, p - 1))}
          >
            −
          </button>
          <span className="people__num">{people}명</span>
          <button
            aria-label="인원 늘리기"
            onClick={() => setPeople((p) => Math.min(10, p + 1))}
          >
            +
          </button>
        </div>
      </div>

      <ul className="budget__list">
        {budget.items.map((b) => (
          <li className="budget__row" key={b.label}>
            <span className="budget__label">{b.label}</span>
            <span className="budget__track">
              <span
                className="budget__fill"
                style={{ width: `${(b.amount / max) * 100}%` }}
              />
            </span>
            <span className="budget__amt">
              {b.amount}
              {budget.unit}
            </span>
          </li>
        ))}
      </ul>

      <div className="budget__total">
        <span>{people}명 합계</span>
        <strong>
          약 {total}
          {budget.unit}
        </strong>
      </div>
      <p className="budget__note">
        1인 약 {perPerson}
        {budget.unit} 기준 · 숙박은 인원·객실에 따라 달라질 수 있어요.
      </p>
    </div>
  );
}
