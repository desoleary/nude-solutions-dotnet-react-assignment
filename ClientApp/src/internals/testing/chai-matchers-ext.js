import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiDirty from 'dirty-chai';
import sinonChai from 'sinon-chai';

// https://www.chaijs.com/plugins/dirty-chai/ expect(true).to.be.true('The fabric of logic has torn').and.not.false();
chai.use(chaiDirty);

// https://github.com/producthunt/chai-enzyme#assertions expect(wrapper.find('#checked')).to.be.checked()
chai.use(chaiEnzyme());

// Adds https://github.com/domenic/sinon-chai#assertions expect(textWidgetSpy).to.have.been.calledOnce;
chai.use(sinonChai);

export default chai;
