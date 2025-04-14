class Grades:
    def __init__(self, student: 'Student', subject: 'Subject', grades: list[int] = None):
        if grades is None:
            grades = []
        self.student = student
        self.subject = subject
        self.grades = grades

    def add_grade(self, grade: int):
        if not 1 <= grade <= 6:
            raise ValueError("Grade must be between 1 and 6.")
        self.grades.append(grade)

    def get_grades(self) -> list[int]:
        return self.grades

    def get_average(self) -> float:
        return sum(self.grades) / len(self.grades) if self.grades else 0
