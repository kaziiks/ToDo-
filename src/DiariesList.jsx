import React from 'react';

// Diary komponentes definīcija
const Diary = ({ title, body, date }) => {
  return (
    <div className="diary">
      <h3>{title}</h3>
      <p>{body}</p>
      <small>{date}</small>
    </div>
  );
};

// DiariesList komponentes definīcija
const DiariesList = () => {
  const diaries = [
    { id: 1, title: 'Pirmais ieraksts', body: 'Šis ir pirmais dienasgrāmatas ieraksts.', date: '2025-05-01' },
    { id: 2, title: 'Otrais ieraksts', body: 'Šis ir otrais dienasgrāmatas ieraksts.', date: '2025-05-10' },
    { id: 3, title: 'Trešais ieraksts', body: 'Šis ir trešais dienasgrāmatas ieraksts.', date: '2025-05-15' },
  ];

  return (
    <div className="diaries-list">
      {diaries.map((diary) => (
        <Diary key={diary.id} title={diary.title} body={diary.body} date={diary.date} />
      ))}
    </div>
  );
};

export default DiariesList;