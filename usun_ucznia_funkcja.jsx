// Dodana strona logowania oraz przekierowanie do e-dziennika po zalogowaniu
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const LoginPage = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (login === 'Admin' && password === '1234') {
      onLogin();
    } else {
      alert('Nieprawidłowy login lub hasło');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Logowanie</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Login"
            className="w-full px-4 py-2 border rounded-xl"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            placeholder="Hasło"
            className="w-full px-4 py-2 border rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" onClick={handleLogin}>Zaloguj</Button>
        </div>
      </div>
    </div>
  );
};

const EDziennik = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [classes, setClasses] = useState([
    {
      id: 1,
      name: '1A',
      students: [
        { id: 1, firstName: 'Jan', lastName: 'Kowalski', dob: '2007-05-14' },
        { id: 2, firstName: 'Anna', lastName: 'Nowak', dob: '2008-09-22' }
      ]
    },
    {
      id: 2,
      name: '2B',
      students: [
        { id: 3, firstName: 'Piotr', lastName: 'Wiśniewski', dob: '2006-11-03' }
      ]
    }
  ]);

  const [expandedClasses, setExpandedClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');

  const toggleClass = (classId) => {
    setExpandedClasses((prev) =>
      prev.includes(classId) ? prev.filter(id => id !== classId) : [...prev, classId]
    );
    setSelectedClassId(classId);
  };

  const handleAddStudent = () => {
    if (!firstName || !lastName || !dob || selectedClassId === null) {
      alert("Wypełnij wszystkie pola");
      return;
    }

    const newId = Date.now();

    const updatedClasses = classes.map(cls => {
      if (cls.id === selectedClassId) {
        const updatedStudents = [
          ...cls.students,
          { id: newId, firstName, lastName, dob }
        ];
        const sortedStudents = updatedStudents.sort((a, b) => a.lastName.localeCompare(b.lastName));
        return {
          ...cls,
          students: sortedStudents
        };
      }
      return cls;
    });

    setClasses(updatedClasses);
    setFirstName('');
    setLastName('');
    setDob('');
  };

  const handleDeleteStudent = (classId, studentId) => {
    const updatedClasses = classes.map(cls => {
      if (cls.id === classId) {
        const updatedStudents = cls.students.filter(s => s.id !== studentId);
        return {
          ...cls,
          students: updatedStudents
        };
      }
      return cls;
    });

    setClasses(updatedClasses);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">E-Dziennik</h1>
      <div className="grid gap-6 max-w-4xl mx-auto">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-2xl shadow-lg">
            <div
              onClick={() => toggleClass(cls.id)}
              className="cursor-pointer p-6 border-b rounded-t-2xl hover:bg-gray-50 flex justify-between items-center"
            >
              <h2 className="text-2xl font-semibold">Klasa {cls.name}</h2>
              <span className="text-xl">{expandedClasses.includes(cls.id) ? '▲' : '▼'}</span>
            </div>
            {expandedClasses.includes(cls.id) && (
              <div className="p-6 space-y-4">
                <ul className="space-y-2">
                  {cls.students.map((student, index) => (
                    <li key={student.id} className="flex flex-col bg-gray-50 rounded-xl px-4 py-2">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-medium">{student.firstName} {student.lastName}</span>
                          <div className="text-sm text-gray-500">Numer: #{index + 1}</div>
                          <div className="text-sm text-gray-500">Data urodzenia: {student.dob}</div>
                        </div>
                        <Button variant="destructive" onClick={() => handleDeleteStudent(cls.id, student.id)}>Usuń</Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="Imię"
                    className="px-4 py-2 border rounded-xl"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Nazwisko"
                    className="px-4 py-2 border rounded-xl"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    type="date"
                    className="px-4 py-2 border rounded-xl"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <Button className="mt-4" onClick={handleAddStudent}>Dodaj ucznia</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EDziennik;
