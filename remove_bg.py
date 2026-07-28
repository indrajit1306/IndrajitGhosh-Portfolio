from rembg import remove
from PIL import Image

input_path = 'public/indrajitGhosh_new.jpg'
output_path = 'public/indrajitGhosh_new_nobg.png'

print("Opening image...")
input = Image.open(input_path)
print("Removing background...")
output = remove(input)
print("Saving image...")
output.save(output_path)
print("Done!")
