package net.corda.flow.pipeline.handlers.requests.sessions

import net.corda.data.flow.state.waiting.SessionData
import net.corda.flow.RequestHandlerTestContext
import net.corda.flow.application.sessions.SessionInfo
import net.corda.flow.fiber.FlowIORequest
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.verify
import org.mockito.kotlin.whenever

class ReceiveRequestHandlerTest {

    private companion object {
        const val SESSION_ID = "session id"
        const val ANOTHER_SESSION_ID = "another session id"
    }

    private val testContext = RequestHandlerTestContext(Any())
    private val flowEventContext = testContext.flowEventContext
    private val flowSessionManager = testContext.flowSessionManager
    private val receiveRequestHandler =
        ReceiveRequestHandler(testContext.initiateFlowReqService)

    @Test
    fun `Returns an updated WaitingFor of SessionData`() {
        val result = receiveRequestHandler.getUpdatedWaitingFor(
            flowEventContext,
            FlowIORequest.Receive(
                setOf(
                    SessionInfo(SESSION_ID, testContext.counterparty),
                    SessionInfo(ANOTHER_SESSION_ID, testContext.counterparty),
                )
            )
        )

        assertEquals(SessionData(listOf(SESSION_ID, ANOTHER_SESSION_ID)), result.value)
    }

    @Test
    fun `No output records if all sessions have already received the required data`() {
        whenever(flowSessionManager.hasReceivedEvents(flowEventContext.checkpoint, listOf(SESSION_ID, ANOTHER_SESSION_ID))).thenReturn(true)
        val outputContext = receiveRequestHandler.postProcess(
            flowEventContext,
            FlowIORequest.Receive(
                setOf(
                    SessionInfo(SESSION_ID, testContext.counterparty),
                    SessionInfo(ANOTHER_SESSION_ID, testContext.counterparty),
                )
            )
        )
        verify(testContext.initiateFlowReqService).initiateFlowsNotInitiated(any(), any())

        assertThat(outputContext.outputRecords).isEmpty()
    }

    @Test
    fun `Does not create a Wakeup record if any the sessions have not already received events`() {
        whenever(
            flowSessionManager.hasReceivedEvents(
                flowEventContext.checkpoint,
                listOf(SESSION_ID, ANOTHER_SESSION_ID)
            )
        ).thenReturn(false)

        val outputContext = receiveRequestHandler.postProcess(
            flowEventContext,
            FlowIORequest.Receive(
                setOf(
                    SessionInfo(SESSION_ID, testContext.counterparty),
                    SessionInfo(ANOTHER_SESSION_ID, testContext.counterparty),
                )
            )
        )
        verify(testContext.initiateFlowReqService).initiateFlowsNotInitiated(any(), any())
        assertEquals(0, outputContext.outputRecords.size)
    }

    @Test
    fun `Does not modify the context when the sessions have not already received events`() {
        whenever(
            flowSessionManager.hasReceivedEvents(
                flowEventContext.checkpoint,
                listOf(SESSION_ID, ANOTHER_SESSION_ID)
            )
        ).thenReturn(false)
        val outputContext = receiveRequestHandler.postProcess(
            flowEventContext,
            FlowIORequest.Receive(
                setOf(
                    SessionInfo(SESSION_ID, testContext.counterparty),
                    SessionInfo(ANOTHER_SESSION_ID, testContext.counterparty),
                )
            )
        )
        verify(testContext.initiateFlowReqService).initiateFlowsNotInitiated(any(), any())
        assertEquals(flowEventContext, outputContext)
    }
}