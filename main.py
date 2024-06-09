import base64

# Original script
original_script = 'print("Hello, World!")'

# Encode the script in base85
encoded_script = base64.b85encode(original_script.encode('utf-8')).decode('utf-8')

# Create the first layer with exec
first_layer = f'exec((lambda _ : (__import__("base64").b85decode(_)))(b"{encoded_script}"))'

# Encode the first layer in base85
second_layer_encoded = base64.b85encode(first_layer.encode('utf-8')).decode('utf-8')

# Create the second layer with exec
second_layer = f'exec((lambda _ : (__import__("base64").b85decode(_)))(b"{second_layer_encoded}"))'

# Encode the second layer in base85
third_layer_encoded = base64.b85encode(second_layer.encode('utf-8')).decode('utf-8')

# Create the third layer with exec
third_layer = f'exec((lambda _ : (__import__("base64").b85decode(_)))(b"{third_layer_encoded}"))'

print(third_layer)