var list = [
    {
        input: 'input[name=email]:eq(0)',
        check: 'test@example.com',
        value: 'test@example.com'
    },
    {
        input: 'input[name=password]:eq(0)',
        value: 'test'
    },
    {
        click: 'button[form=login]:eq(0)'
    }
];

var config = {
    timeout: 100
};

var test = new Clickr(list, config);

test.step();
