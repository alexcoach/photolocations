import Model from '../Model';

class TestModel extends Model {
    testProp1: string;
    testProp2: number;
}

const testModelInstance = new TestModel({
    testProp1: 'test',
    testProp2: 100,
});

it('Creating model  correctly', () => {
    expect(testModelInstance.testProp1).toEqual('test');
    expect(testModelInstance.testProp2).toEqual(100);
});
