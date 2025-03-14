
def read_graph(filename: str) -> tuple:
    with open(filename, 'r') as file:
        n = int(file.readline())
        adjacency_list = [list(map(int, line.split())) for line in file.readlines()]
    return adjacency_list, n


def write_neighbours_list(adjacency_list: list):
    for i, neighbours in enumerate(adjacency_list):
        print(f"S¹siadami wierzcho³ka {i} s¹: {', '.join(map(str, neighbours))}")


def list_to_matrix(adjacency_list: list, n: int) -> list:
    matrix = [[0] * n for _ in range(n)]
    for i, neighbours in enumerate(adjacency_list):
        for neighbour in neighbours:
            matrix[i][neighbour] = 1
    return matrix


def write_matrix(matrix: list):
    for row in matrix:
        print(' '.join(map(str, row)))


def main():
    adjacency_list, n = read_graph('graph.txt')
    write_neighbours_list(adjacency_list)
    matrix = list_to_matrix(adjacency_list, n)
    write_matrix(matrix)

if __name__ == '__main__':
    main()
