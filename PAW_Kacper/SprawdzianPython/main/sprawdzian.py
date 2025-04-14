import json
from models.Student import Student
from models.Teacher import Teacher
from models.Subject import Subject
from models.Grades import Grades
from year_grade import year_grade
from datetime import datetime


def import_teachers(file_path: str) -> list[Teacher]:
    teachers = []
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.split()
            teachers.append(Teacher(int(parts[0]), parts[1], parts[2]))
    return teachers

def import_subjects(file_path: str, teachers: list[Teacher]) -> list[Subject]:
    subjects = []
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.split()
            teacher = next((t for t in teachers if t._id == int(parts[2])), None)
            if teacher:
                subjects.append(Subject(int(parts[0]), parts[1], teacher))
    return subjects

def import_students(file_path: str) -> list[Student]:
    students = []
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.split()
            birth_date = datetime.strptime(parts[3], "%Y-%m-%d").date()
            students.append(Student(int(parts[0]), parts[1], parts[2], birth_date))
    return students

def import_grades(file_path: str, students: list[Student], subjects: list[Subject]) -> list[Grades]:
    grades_list = []
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split(',')
            student = next((s for s in students if s._id == int(parts[0])), None)
            subject = next((s for s in subjects if s._id == int(parts[1])), None)
            if student and subject:
                grades = list(map(int, parts[2:]))
                grades_list.append(Grades(student, subject, grades))
    return grades_list

def main():
    teachers = import_teachers("teachers.txt")
    subjects = import_subjects("subjects.txt", teachers)
    students = import_students("students.txt")
    grades = import_grades("grades.txt", students, subjects)

    # Wyświetlanie ocen i średnich
    for student in students:
        print(f"{student.first_name} {student.last_name} ({student.age}):")
        for subject in subjects:
            student_grades = next((g for g in grades if g.student == student and g.subject == subject), None)
            if student_grades:
                avg = student_grades.get_average()
                final_grade = year_grade(avg)
                print(f"{subject.name}:")
                print(f"Oceny: {', '.join(map(str, student_grades.get_grades()))}")
                print(f"Średnia: {avg:.2f}")
                print(f"Ocena końcowa: {final_grade}")
        print()

if __name__ == "__main__":
    main()
