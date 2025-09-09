GRAPH = {
    "Pelotas": {"Camaqua": 150, "Rio Grande": 55, "Bage": 180, "Santa Maria": 370},
    "Camaqua": {"Pelotas": 150, "Guaiba": 65, "Porto Alegre": 125},
    "Guaiba": {"Camaqua": 65, "Porto Alegre": 30},
    "Porto Alegre": {
        "Guaiba": 30,
        "Camaqua": 125,
        "Rio Grande": 320,
        "Bage": 380,
        "Santa Maria": 290,
    },
    "Rio Grande": {"Pelotas": 55, "Porto Alegre": 320},
    "Bage": {"Pelotas": 180, "Porto Alegre": 380},
    "Santa Maria": {"Pelotas": 370, "Porto Alegre": 290},
}

HEURISTICA_POA = {
    "Porto Alegre": 0,
    "Pelotas": 235,
    "Camaqua": 125,
    "Guaiba": 30,
    "Rio Grande": 320,
    "Bage": 380,
    "Santa Maria": 290,
}

def BFS():
    pass

def DFS():
    pass

def Dijkstra():
    pass
