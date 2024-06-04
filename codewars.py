""" def narcissistic(value):
    value_n = 0
    j = 1
    for i in range(len(str(value))):
        value_n += pow(int(str(value // j)[len(str(value // j)) - 1]), len(str(value)))
        j *= 10
    return value == value_n """

""" def narcissistic(value):
    num_str = str(value)
    num_digits = len(num_str)
    value_n = sum(int(digit) ** num_digits for digit in num_str)
    return value == value_n


print(narcissistic(7))
print(narcissistic(371))
print(narcissistic(122))
print(narcissistic(4887)) """

print(sum(i for i in range(1, 15, 2)))
