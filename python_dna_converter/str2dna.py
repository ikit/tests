# A quick and dirty script to translate ASCII into DNA
# by treating DNA's ACGT as a quaternary system
# Base converter credit from
# http://djangosnippets.org/snippets/1431/

class BaseConverter(object):
    decimal_digits = "0123456789"
    
    def __init__(self, digits):
        self.digits = digits
    
    def from_decimal(self, i):
        return self.convert(i, self.decimal_digits, self.digits)
    
    def to_decimal(self, s):
        return int(self.convert(s, self.digits, self.decimal_digits))
    
    def convert(self, number, fromdigits, todigits):
        # Based on http://code.activestate.com/recipes/111286/
        if str(number)[0] == '-':
            number = str(number)[1:]
            neg = 1
        else:
            neg = 0

        # make an integer out of the number
        x = 0
        for digit in str(number):
           x = x * len(fromdigits) + fromdigits.index(digit)
    
        # create the result in base 'len(todigits)'
        if x == 0:
            res = todigits[0]
        else:
            res = ""
            while x > 0:
                digit = x % len(todigits)
                res = todigits[digit] + res
                x = int(x / len(todigits))
            if neg:
                res = '-' + res
        return res


def ascii_to_dna(string):
    """Translates ASCII code to DNA."""
    converter = BaseConverter('ACGT')
    dna = ""
    for char in string:
        decimal = ord(char)
        dna_number = converter.from_decimal(decimal)
        # 4 digit padding
        dna_number = dna_number.rjust(4, 'A')
        dna += dna_number
    return dna


print (ascii_to_dna("La phrase mystère :)"))
